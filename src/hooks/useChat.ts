import { useState, useCallback } from 'react';
import { Message } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { aiService } from '../services/aiService';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function useChat() {
  const { messages, addMessage, isTyping, setIsTyping, user } = useStore();

  const sendMessage = useCallback(async (
    content: string, 
    senderId: string, 
    type: 'text' | 'code' | 'file' | 'image' = 'text'
  ) => {
    const newMessage: Message = {
      id: uuidv4(),
      senderId,
      content,
      timestamp: new Date(),
      type,
    };

    addMessage(newMessage);

    // Save to database
    try {
      await supabase.from('messages').insert({
        conversation_id: 'default', // You can implement multiple conversations
        sender_id: senderId,
        content,
        message_type: type,
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }

    // Generate AI response if user sent the message
    if (senderId === 'user') {
      setIsTyping(true);
      
      try {
        // Randomly select an AI team member to respond
        const aiMembers = ['1', '2', '3', '4', '5'];
        const randomMember = aiMembers[Math.floor(Math.random() * aiMembers.length)];
        
        // Load user's API keys
        if (user?.id) {
          await aiService.loadUserApiKeys(user.id);
        }

        // Generate AI response
        const aiResponse = await aiService.generateResponse(content, randomMember);
        
        const aiMessage: Message = {
          id: uuidv4(),
          senderId: randomMember,
          content: aiResponse,
          timestamp: new Date(),
          type: 'text',
        };

        addMessage(aiMessage);

        // Save AI response to database
        await supabase.from('messages').insert({
          conversation_id: 'default',
          sender_id: randomMember,
          content: aiResponse,
          message_type: 'text',
        });

      } catch (error) {
        console.error('Error generating AI response:', error);
        toast.error('Failed to generate AI response. Please check your API keys.');
        
        // Fallback response
        const fallbackMessage: Message = {
          id: uuidv4(),
          senderId: '1',
          content: 'I apologize, but I cannot respond right now. Please ensure your API keys are configured correctly.',
          timestamp: new Date(),
          type: 'text',
        };
        addMessage(fallbackMessage);
      } finally {
        setIsTyping(false);
      }
    }
  }, [addMessage, setIsTyping, user]);

  const generateCode = useCallback(async (prompt: string, language: string = 'javascript') => {
    try {
      if (user?.id) {
        await aiService.loadUserApiKeys(user.id);
      }
      
      const code = await aiService.generateCode(prompt, language);
      return code;
    } catch (error) {
      console.error('Error generating code:', error);
      toast.error('Failed to generate code. Please check your API keys.');
      return '';
    }
  }, [user]);

  const performResearch = useCallback(async (query: string) => {
    try {
      const results = await aiService.performResearch(query);
      return results;
    } catch (error) {
      console.error('Error performing research:', error);
      toast.error('Failed to perform research.');
      return null;
    }
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    generateCode,
    performResearch,
  };
}