import { BlogPost } from "@/types";

export const blogPostsData: BlogPost[] = [
  {
    id: "fraud-detection-ml",
    slug: "fraud-detection-ml",
    title: "Detecting Financial Fraud with Random Forests: 99.97% Accuracy at Scale",
    excerpt:
      "A deep dive into training tree-based ensemble models on 6.36 million transaction rows, handling severe class imbalance, and isolating high-leverage features.",
    content: `Financial fraud detection poses one of the most demanding challenges in modern machine learning. In datasets containing millions of transactions, fraudulent instances frequently constitute less than 0.1% of the overall volume. 

In my recent engineering project, I tackled this challenge across a 6.36 million row dataset. By analyzing key indicators such as transaction balance shifts—specifically original versus new account balances alongside transaction velocity—we trained a Random Forest model achieving a 99.97% accuracy score and robust cross-validation metrics.

### Key Takeaways:
1. **Feature Engineering**: Balance discrepancy features account for over 58% of predictive power.
2. **K-Fold Stratification**: Stratified sampling ensures every fold reflects realistic fraud distributions.
3. **Low-Latency Inference**: Tree inference can be optimized down to single-digit milliseconds for real-time transaction approval pipelines.`,
    date: "August 15, 2024",
    author: "Karan Mishra",
    readTime: "5 min read",
    category: "Machine Learning",
    image: "/img/blog/main-blog/m-blog-1.jpg",
    tags: ["Machine Learning", "Python", "Fraud Detection", "Scikit-Learn"],
  },
  {
    id: "sentiment-analysis-voice",
    slug: "sentiment-analysis-voice",
    title: "Beyond Text: Integrating Speech Recognition into Multimodal Sentiment Pipelines",
    excerpt:
      "Exploring SentiVoice: Combining acoustic frequency features and transcribed natural language processing to decode real customer emotional intent.",
    content: `Textual sentiment analysis often misses the nuances of tone, sarcasm, and inflection that oral communication conveys. By engineering SentiVoice, we bridged the gap between acoustic speech recognition and NLP classification.

Using Python, SpeechRecognition, and Transformer models, spoken audio is simultaneously transcribed and analyzed for emotional prosody. The result is a richer customer insight metric that powers modern AI support desks.`,
    date: "July 28, 2024",
    author: "Karan Mishra",
    readTime: "4 min read",
    category: "NLP & AI",
    image: "/img/blog/main-blog/m-blog-2.jpg",
    tags: ["NLP", "Voice AI", "Python", "Deep Learning"],
  },
  {
    id: "building-iaim-labs",
    slug: "building-iaim-labs",
    title: "Founding i AIM LABS: Transforming AI Research into Real-World Business Tools",
    excerpt:
      "Why I started i AIM LABS, our mission to bridge small businesses with state-of-the-art technology, and how research-driven development creates long-term value.",
    content: `Small and medium businesses frequently struggle to navigate the overwhelming explosion of artificial intelligence tools. Our foundational philosophy at i AIM LABS is simple: technology must solve concrete business bottlenecks, eliminate manual drudgery, and deliver measurable ROI.

From automated web scraping bots to predictive customer analytics, our research-driven development methodology ensures solutions are tailor-made for each partner's growth trajectory.`,
    date: "August 20, 2024",
    author: "Karan Mishra",
    readTime: "6 min read",
    category: "Leadership",
    image: "/img/blog/main-blog/m-blog-3.jpg",
    tags: ["Startups", "i AIM LABS", "AI Strategy", "Consulting"],
  },
];
