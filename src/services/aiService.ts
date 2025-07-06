import OpenAI from "openai";
import { supabase } from "../lib/supabase";

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
        dangerouslyAllowBrowser: true,
      });
      this.apiKeys.openai = openaiKey;
    }
  }

  async loadUserApiKeys(userId: string) {
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .eq("user_id", userId)
        .eq("is_active", true);

      if (error) throw error;

      data?.forEach((key) => {
        this.apiKeys[key.service] = key.api_key;
        if (key.service === "openai") {
          this.openai = new OpenAI({
            apiKey: key.api_key,
            dangerouslyAllowBrowser: true,
          });
        }
      });
    } catch (error) {
      console.error("Error loading API keys:", error);
    }
  }

  async saveApiKey(userId: string, service: string, apiKey: string) {
    try {
      const { error } = await supabase.from("api_keys").upsert({
        user_id: userId,
        service,
        api_key: apiKey,
        is_active: true,
      });

      if (error) throw error;

      this.apiKeys[service] = apiKey;
      if (service === "openai") {
        this.openai = new OpenAI({
          apiKey,
          dangerouslyAllowBrowser: true,
        });
      }

      return true;
    } catch (error) {
      console.error("Error saving API key:", error);
      return false;
    }
  }

  async generateResponse(message: string, teamMemberId: string, context?: any) {
    const teamMemberPrompts = {
      "1": "You are Alex Chen, a senior full-stack developer. Respond as a helpful, technical expert who can write code, debug issues, and provide architectural guidance.",
      "2": "You are Sarah Design, a creative UI/UX designer. Respond with design insights, user experience recommendations, and visual design suggestions.",
      "3": "You are Dr. Research, a data scientist and researcher. Provide analytical insights, research findings, and data-driven recommendations.",
      "4": "You are Mike Manager, an agile project manager. Focus on project planning, timeline management, and team coordination.",
      "5": "You are Tina Tester, a QA engineer. Provide testing strategies, bug reports, and quality assurance guidance.",
    };

    const teamMemberNames = {
      "1": "Alex Chen (Developer)",
      "2": "Sarah Design (Designer)",
      "3": "Dr. Research (Data Scientist)",
      "4": "Mike Manager (PM)",
      "5": "Tina Tester (QA)",
    };

    // Demo mode responses when no API key is configured
    if (!this.openai) {
      const demoResponses = {
        "1": [
          "I'd be happy to help you with that! For this type of functionality, I'd recommend using React with TypeScript. Here's a quick example:\n\n```typescript\nconst MyComponent = () => {\n  const [state, setState] = useState('');\n  return <div>{state}</div>;\n};\n```\n\nWould you like me to elaborate on any specific part?",
          "Great question! Let me break down the architecture for you. We should consider using a microservices approach with React frontend, Node.js backend, and PostgreSQL database. This will give us scalability and maintainability.",
          "I see you're working on a challenging problem. Let's approach this systematically. First, let's identify the core requirements, then we can design the solution step by step.",
        ],
        "2": [
          "From a design perspective, I'd suggest focusing on user experience first. Here are some key principles:\n\n• Clear visual hierarchy\n• Consistent spacing and typography\n• Accessible color contrast\n• Intuitive navigation patterns\n\nWould you like me to create some mockups for this?",
          "That's an interesting design challenge! I recommend we start with user personas and journey mapping. Understanding your users' needs will help us create a more effective interface.",
          "Great thinking! For the UI, I'd suggest using a clean, modern design with plenty of white space. Consider implementing a design system to maintain consistency across components.",
        ],
        "3": [
          "Interesting data problem! Let me analyze this from a research perspective. We should start by collecting baseline metrics and establishing clear KPIs. I'd recommend using statistical analysis to identify patterns and trends.",
          "Based on research best practices, I suggest we implement A/B testing to validate our hypotheses. We can use tools like Amplitude or Mixpanel for tracking user behavior and measuring success metrics.",
          "From a data science standpoint, this looks like a perfect use case for machine learning. I'd recommend starting with a simple classification model and iterating based on performance metrics.",
        ],
        "4": [
          "As your project manager, I think we should break this down into manageable sprints. Here's how I'd structure it:\n\n🎯 Sprint 1: Core functionality\n🎯 Sprint 2: User interface\n🎯 Sprint 3: Testing & optimization\n\nEach sprint should be 2 weeks with clear deliverables.",
          "Great project scope! Let's create a timeline and identify potential risks early. I suggest we use agile methodology with daily standups and weekly retrospectives to ensure we stay on track.",
          "From a project management perspective, we need to prioritize features based on user value and technical complexity. I'll help coordinate between team members and ensure we meet our deadlines.",
        ],
        "5": [
          "From a QA perspective, we need to ensure comprehensive test coverage. Here's my testing strategy:\n\n✅ Unit tests for core logic\n✅ Integration tests for API endpoints\n✅ E2E tests for user workflows\n✅ Performance testing\n\nI can help set up the testing framework.",
          "Excellent! Let me create a test plan for this feature. We should cover both positive and negative test cases, edge cases, and accessibility testing. I'll also set up automated regression tests.",
          "Quality assurance is crucial here. I recommend implementing continuous testing in our CI/CD pipeline. We should also conduct usability testing with real users to ensure the feature works as expected.",
        ],
      };

      const responses =
        demoResponses[teamMemberId as keyof typeof demoResponses] ||
        demoResponses["1"];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      return `${randomResponse}\n\n*Note: This is a demo response. Connect your OpenAI API key in Settings for full AI capabilities.*`;
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              teamMemberPrompts[
                teamMemberId as keyof typeof teamMemberPrompts
              ] || "You are a helpful AI assistant.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return (
        response.choices[0]?.message?.content ||
        "I apologize, but I cannot generate a response right now."
      );
    } catch (error) {
      console.error("Error generating AI response:", error);
      throw error;
    }
  }

  async generateCode(prompt: string, language: string = "javascript") {
    if (!this.openai) {
      throw new Error("OpenAI API key not configured");
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert ${language} developer. Generate clean, well-commented code based on the user's request. Only return the code without explanations unless specifically asked.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      });

      return response.choices[0]?.message?.content || "";
    } catch (error) {
      console.error("Error generating code:", error);
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
          title: "Relevant Article 1",
          url: "https://example.com/article1",
          snippet: "This article provides insights into the topic...",
        },
        {
          title: "Relevant Article 2",
          url: "https://example.com/article2",
          snippet: "Additional information about the subject...",
        },
      ],
    };
  }

  isConfigured(service: string = "openai"): boolean {
    return !!this.apiKeys[service];
  }
}

export const aiService = new AIService();
