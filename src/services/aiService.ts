import OpenAI from 'openai';
import { supabase } from '../lib/supabase';

class AIService {
  private openai: OpenAI | null = null;
  private apiKeys: Record<string, string> = {};

  constructor() {
    this.initializeFromEnv();
  }

  private initializeFromEnv() {
    const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (openaiKey) {
      this.openai = new OpenAI({
        apiKey: openaiKey,
        dangerouslyAllowBrowser: true
      });
      this.apiKeys.openai = openaiKey;
    }
  }

  async loadUserApiKeys(userId: string) {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true);

      if (error) throw error;

      data?.forEach(key => {
        this.apiKeys[key.service] = key.api_key;
        if (key.service === 'openai') {
          this.openai = new OpenAI({
            apiKey: key.api_key,
            dangerouslyAllowBrowser: true
          });
        }
      });
    } catch (error) {
      console.error('Error loading API keys:', error);
    }
  }

  async saveApiKey(userId: string, service: string, apiKey: string) {
    try {
      const { error } = await supabase
        .from('api_keys')
        .upsert({
          user_id: userId,
          service,
          api_key: apiKey,
          is_active: true
        });

      if (error) throw error;

      this.apiKeys[service] = apiKey;
      if (service === 'openai') {
        this.openai = new OpenAI({
          apiKey,
          dangerouslyAllowBrowser: true
        });
      }

      return true;
    } catch (error) {
      console.error('Error saving API key:', error);
      return false;
    }
  }

  async generateResponse(message: string, teamMemberId: string, context?: any) {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const teamMemberPrompts = {
      '1': 'You are Alex Chen, a senior full-stack developer. Respond as a helpful, technical expert who can write code, debug issues, and provide architectural guidance.',
      '2': 'You are Sarah Design, a creative UI/UX designer. Respond with design insights, user experience recommendations, and visual design suggestions.',
      '3': 'You are Dr. Research, a data scientist and researcher. Provide analytical insights, research findings, and data-driven recommendations.',
      '4': 'You are Mike Manager, an agile project manager. Focus on project planning, timeline management, and team coordination.',
      '5': 'You are Tina Tester, a QA engineer. Provide testing strategies, bug reports, and quality assurance guidance.'
    };

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: teamMemberPrompts[teamMemberId as keyof typeof teamMemberPrompts] || 'You are a helpful AI assistant.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      return response.choices[0]?.message?.content || 'I apologize, but I cannot generate a response right now.';
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }

  async generateCode(prompt: string, language: string = 'javascript') {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an expert ${language} developer. Generate clean, well-commented code based on the user's request. Only return the code without explanations unless specifically asked.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.3
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating code:', error);
      throw error;
    }
  }

  async performResearch(query: string) {
    // This would integrate with research APIs like Perplexity, SERP API, etc.
    // For now, we'll simulate research results
    return {
      summary: `Research results for: ${query}`,
      sources: [
        {
          title: 'Relevant Article 1',
          url: 'https://example.com/article1',
          snippet: 'This article provides insights into the topic...'
        },
        {
          title: 'Relevant Article 2',
          url: 'https://example.com/article2',
          snippet: 'Additional information about the subject...'
        }
      ]
    };
  }

  isConfigured(service: string = 'openai'): boolean {
    return !!this.apiKeys[service];
  }
}

export const aiService = new AIService();