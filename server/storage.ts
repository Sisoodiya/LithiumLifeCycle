import {
  users, batteries, businessInquiries, subsidies, contributions, 
  ideas, marketplaceItems, pickupRequests, newsletterSubscribers,
  marketData, chartData,
  type User, type InsertUser, type Battery, type InsertBattery,
  type BusinessInquiry, type InsertBusinessInquiry, type Subsidy, 
  type InsertSubsidy, type Contribution, type InsertContribution,
  type Idea, type InsertIdea, type MarketplaceItem, type InsertMarketplaceItem,
  type PickupRequest, type InsertPickupRequest, type NewsletterSubscriber,
  type InsertNewsletterSubscriber, type MarketData, type InsertMarketData,
  type ChartData, type InsertChartData
} from "@shared/schema";

// This interface defines all the storage methods needed for our application
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Battery methods
  createBattery(battery: InsertBattery & { userId?: number }): Promise<Battery>;
  getBattery(id: number): Promise<Battery | undefined>;
  getBatteriesByUserId(userId: number): Promise<Battery[]>;
  getAllBatteries(): Promise<Battery[]>;
  updateBatteryPrice(id: number, price: number): Promise<Battery | undefined>;

  // Business inquiry methods
  createBusinessInquiry(inquiry: InsertBusinessInquiry): Promise<BusinessInquiry>;
  getBusinessInquiries(): Promise<BusinessInquiry[]>;
  getBusinessInquiry(id: number): Promise<BusinessInquiry | undefined>;
  
  // Subsidy methods
  createSubsidy(subsidy: InsertSubsidy): Promise<Subsidy>;
  getSubsidies(): Promise<Subsidy[]>;
  searchSubsidies(searchTerm: string): Promise<Subsidy[]>;
  filterSubsidies(region?: string, type?: string): Promise<Subsidy[]>;

  // Contribution methods
  createContribution(contribution: InsertContribution): Promise<Contribution>;
  getContributions(): Promise<Contribution[]>;

  // Ideas methods
  createIdea(idea: InsertIdea): Promise<Idea>;
  getIdeas(): Promise<Idea[]>;
  likeIdea(id: number): Promise<Idea | undefined>;
  
  // Marketplace methods
  createMarketplaceItem(item: InsertMarketplaceItem & { sellerId?: number }): Promise<MarketplaceItem>;
  getMarketplaceItems(): Promise<MarketplaceItem[]>;
  getMarketplaceItem(id: number): Promise<MarketplaceItem | undefined>;
  searchMarketplaceItems(searchTerm: string): Promise<MarketplaceItem[]>;
  filterMarketplaceItems(category?: string, condition?: string): Promise<MarketplaceItem[]>;
  
  // Pickup request methods
  createPickupRequest(request: InsertPickupRequest): Promise<PickupRequest>;
  getPickupRequestsByBatteryId(batteryId: number): Promise<PickupRequest[]>;
  
  // Newsletter subscriber methods
  addNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  
  // Market data methods
  getMarketData(): Promise<MarketData[]>;
  getMarketDataByType(type: string): Promise<MarketData[]>;
  addMarketData(data: InsertMarketData): Promise<MarketData>;
  
  // Chart data methods
  getChartData(type: string): Promise<ChartData | undefined>;
  addChartData(data: InsertChartData): Promise<ChartData>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private batteries: Map<number, Battery>;
  private businessInquiries: Map<number, BusinessInquiry>;
  private subsidies: Map<number, Subsidy>;
  private contributions: Map<number, Contribution>;
  private ideas: Map<number, Idea>;
  private marketplaceItems: Map<number, MarketplaceItem>;
  private pickupRequests: Map<number, PickupRequest>;
  private newsletterSubscribers: Map<number, NewsletterSubscriber>;
  private marketDataItems: Map<number, MarketData>;
  private chartDataItems: Map<number, ChartData>;
  
  private currentUserId: number;
  private currentBatteryId: number;
  private currentBusinessInquiryId: number;
  private currentSubsidyId: number;
  private currentContributionId: number;
  private currentIdeaId: number;
  private currentMarketplaceItemId: number;
  private currentPickupRequestId: number;
  private currentNewsletterSubscriberId: number;
  private currentMarketDataId: number;
  private currentChartDataId: number;

  constructor() {
    this.users = new Map();
    this.batteries = new Map();
    this.businessInquiries = new Map();
    this.subsidies = new Map();
    this.contributions = new Map();
    this.ideas = new Map();
    this.marketplaceItems = new Map();
    this.pickupRequests = new Map();
    this.newsletterSubscribers = new Map();
    this.marketDataItems = new Map();
    this.chartDataItems = new Map();
    
    this.currentUserId = 1;
    this.currentBatteryId = 1;
    this.currentBusinessInquiryId = 1;
    this.currentSubsidyId = 1;
    this.currentContributionId = 1;
    this.currentIdeaId = 1;
    this.currentMarketplaceItemId = 1;
    this.currentPickupRequestId = 1;
    this.currentNewsletterSubscriberId = 1;
    this.currentMarketDataId = 1;
    this.currentChartDataId = 1;

    // Initialize with some market data for the home page
    this.seedMarketData();
    this.seedChartData();
    this.seedSubsidies();
    this.seedIdeas();
    this.seedMarketplaceItems();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Battery methods
  async createBattery(battery: InsertBattery & { userId?: number }): Promise<Battery> {
    const id = this.currentBatteryId++;
    const newBattery: Battery = {
      ...battery,
      id,
      estimatedPrice: null,
      userId: battery.userId || null,
      createdAt: new Date(),
    };
    this.batteries.set(id, newBattery);
    return newBattery;
  }

  async getBattery(id: number): Promise<Battery | undefined> {
    return this.batteries.get(id);
  }

  async getBatteriesByUserId(userId: number): Promise<Battery[]> {
    return Array.from(this.batteries.values()).filter(
      battery => battery.userId === userId
    );
  }

  async getAllBatteries(): Promise<Battery[]> {
    return Array.from(this.batteries.values());
  }

  async updateBatteryPrice(id: number, price: number): Promise<Battery | undefined> {
    const battery = this.batteries.get(id);
    if (!battery) return undefined;
    
    const updatedBattery = {...battery, estimatedPrice: price};
    this.batteries.set(id, updatedBattery);
    return updatedBattery;
  }

  // Business inquiry methods
  async createBusinessInquiry(inquiry: InsertBusinessInquiry): Promise<BusinessInquiry> {
    const id = this.currentBusinessInquiryId++;
    const newInquiry: BusinessInquiry = {
      ...inquiry,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.businessInquiries.set(id, newInquiry);
    return newInquiry;
  }

  async getBusinessInquiries(): Promise<BusinessInquiry[]> {
    return Array.from(this.businessInquiries.values());
  }

  async getBusinessInquiry(id: number): Promise<BusinessInquiry | undefined> {
    return this.businessInquiries.get(id);
  }

  // Subsidy methods
  async createSubsidy(subsidy: InsertSubsidy): Promise<Subsidy> {
    const id = this.currentSubsidyId++;
    const newSubsidy: Subsidy = {
      ...subsidy,
      id,
      createdAt: new Date(),
    };
    this.subsidies.set(id, newSubsidy);
    return newSubsidy;
  }

  async getSubsidies(): Promise<Subsidy[]> {
    return Array.from(this.subsidies.values());
  }

  async searchSubsidies(searchTerm: string): Promise<Subsidy[]> {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return Array.from(this.subsidies.values()).filter(subsidy => 
      subsidy.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      subsidy.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      subsidy.eligibility.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  async filterSubsidies(region?: string, type?: string): Promise<Subsidy[]> {
    let filteredSubsidies = Array.from(this.subsidies.values());
    
    if (region) {
      filteredSubsidies = filteredSubsidies.filter(
        subsidy => subsidy.region === region
      );
    }
    
    if (type) {
      filteredSubsidies = filteredSubsidies.filter(
        subsidy => subsidy.type === type
      );
    }
    
    return filteredSubsidies;
  }

  // Contribution methods
  async createContribution(contribution: InsertContribution): Promise<Contribution> {
    const id = this.currentContributionId++;
    const newContribution: Contribution = {
      ...contribution,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.contributions.set(id, newContribution);
    return newContribution;
  }

  async getContributions(): Promise<Contribution[]> {
    return Array.from(this.contributions.values());
  }

  // Ideas methods
  async createIdea(idea: InsertIdea): Promise<Idea> {
    const id = this.currentIdeaId++;
    const newIdea: Idea = {
      ...idea,
      id,
      likes: 0,
      comments: 0,
      createdAt: new Date(),
    };
    this.ideas.set(id, newIdea);
    return newIdea;
  }

  async getIdeas(): Promise<Idea[]> {
    return Array.from(this.ideas.values());
  }

  async likeIdea(id: number): Promise<Idea | undefined> {
    const idea = this.ideas.get(id);
    if (!idea) return undefined;
    
    const updatedIdea = {...idea, likes: idea.likes + 1};
    this.ideas.set(id, updatedIdea);
    return updatedIdea;
  }

  // Marketplace methods
  async createMarketplaceItem(item: InsertMarketplaceItem & { sellerId?: number }): Promise<MarketplaceItem> {
    const id = this.currentMarketplaceItemId++;
    const newItem: MarketplaceItem = {
      ...item,
      id,
      sellerId: item.sellerId || null,
      createdAt: new Date(),
    };
    this.marketplaceItems.set(id, newItem);
    return newItem;
  }

  async getMarketplaceItems(): Promise<MarketplaceItem[]> {
    return Array.from(this.marketplaceItems.values());
  }

  async getMarketplaceItem(id: number): Promise<MarketplaceItem | undefined> {
    return this.marketplaceItems.get(id);
  }

  async searchMarketplaceItems(searchTerm: string): Promise<MarketplaceItem[]> {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return Array.from(this.marketplaceItems.values()).filter(item => 
      item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.specifications.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  async filterMarketplaceItems(category?: string, condition?: string): Promise<MarketplaceItem[]> {
    let filteredItems = Array.from(this.marketplaceItems.values());
    
    if (category) {
      filteredItems = filteredItems.filter(
        item => item.category === category
      );
    }
    
    if (condition) {
      filteredItems = filteredItems.filter(
        item => item.condition === condition
      );
    }
    
    return filteredItems;
  }

  // Pickup request methods
  async createPickupRequest(request: InsertPickupRequest): Promise<PickupRequest> {
    const id = this.currentPickupRequestId++;
    const newRequest: PickupRequest = {
      ...request,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.pickupRequests.set(id, newRequest);
    return newRequest;
  }

  async getPickupRequestsByBatteryId(batteryId: number): Promise<PickupRequest[]> {
    return Array.from(this.pickupRequests.values()).filter(
      request => request.batteryId === batteryId
    );
  }

  // Newsletter subscriber methods
  async addNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.newsletterSubscribers.values()).find(
      sub => sub.email === subscriber.email
    );
    
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.currentNewsletterSubscriberId++;
    const newSubscriber: NewsletterSubscriber = {
      ...subscriber,
      id,
      createdAt: new Date(),
    };
    this.newsletterSubscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  // Market data methods
  async getMarketData(): Promise<MarketData[]> {
    return Array.from(this.marketDataItems.values());
  }

  async getMarketDataByType(type: string): Promise<MarketData[]> {
    return Array.from(this.marketDataItems.values()).filter(
      data => data.dataType === type
    );
  }

  async addMarketData(data: InsertMarketData): Promise<MarketData> {
    const id = this.currentMarketDataId++;
    const newData: MarketData = {
      ...data,
      id,
      createdAt: new Date(),
    };
    this.marketDataItems.set(id, newData);
    return newData;
  }

  // Chart data methods
  async getChartData(type: string): Promise<ChartData | undefined> {
    return Array.from(this.chartDataItems.values()).find(
      data => data.chartType === type
    );
  }

  async addChartData(data: InsertChartData): Promise<ChartData> {
    const id = this.currentChartDataId++;
    const newData: ChartData = {
      ...data,
      id,
      createdAt: new Date(),
    };
    this.chartDataItems.set(id, newData);
    return newData;
  }

  // Seed methods to provide initial data
  private seedMarketData() {
    const marketDataItems = [
      {
        dataType: "recycled_batteries",
        value: 14253,
        unit: "units",
        change: 23.5,
        year: 2023,
      },
      {
        dataType: "market_value",
        value: 84.2,
        unit: "million USD",
        change: 18.3,
        year: 2023,
      },
      {
        dataType: "resource_recovery",
        value: 5842,
        unit: "kg",
        change: 31.2,
        year: 2023,
      }
    ];

    marketDataItems.forEach(item => {
      this.addMarketData(item);
    });
  }

  private seedChartData() {
    // Market gap chart data
    const marketGapData = {
      chartType: "market_gap",
      data: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024 (Projected)'],
        datasets: [
          {
            label: 'EV Battery Demand',
            data: [120, 190, 300, 450, 620, 800, 950],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          },
          {
            label: 'Battery Supply',
            data: [100, 150, 230, 380, 500, 650, 720],
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
          }
        ]
      }
    };

    // Recovery rates chart data
    const recoveryRatesData = {
      chartType: "recovery_rates",
      data: {
        labels: ['Lithium', 'Cobalt', 'Nickel', 'Manganese', 'Copper', 'Aluminum'],
        datasets: [
          {
            label: 'Traditional Methods',
            data: [30, 60, 55, 40, 75, 80],
            backgroundColor: 'rgba(107, 114, 128, 0.7)',
          },
          {
            label: 'Our Technology',
            data: [85, 92, 88, 75, 95, 97],
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
          }
        ]
      }
    };

    this.addChartData(marketGapData);
    this.addChartData(recoveryRatesData);
  }

  private seedSubsidies() {
    const subsidiesData = [
      {
        title: "Federal Electric Vehicle Tax Credit",
        region: "federal",
        type: "tax",
        benefitAmount: "Up to $7,500",
        eligibility: "New electric vehicles purchased after January 1, 2023",
        description: "Tax credit for purchasing new qualified plug-in electric drive motor vehicles, including passenger vehicles and light trucks. Credit amount depends on battery capacity and other factors.",
        status: "active"
      },
      {
        title: "Battery Recycling Infrastructure Grant",
        region: "state",
        type: "grant",
        benefitAmount: "Up to $500,000",
        eligibility: "Businesses establishing battery recycling facilities",
        description: "Grants for businesses and organizations establishing or expanding lithium-ion battery recycling infrastructure. Covers up to 50% of eligible costs for equipment, facilities, and technology implementation.",
        status: "active"
      },
      {
        title: "Energy Storage Rebate Program",
        region: "local",
        type: "rebate",
        benefitAmount: "$0.25/Wh, up to $5,000",
        eligibility: "Residential and commercial energy storage installations",
        description: "Rebates for installing energy storage systems, including those using recycled lithium-ion batteries. Promotes second-life applications for EV batteries and increases grid resilience.",
        status: "active"
      }
    ];

    subsidiesData.forEach(subsidy => {
      this.createSubsidy(subsidy);
    });
  }

  private seedIdeas() {
    const ideasData = [
      {
        title: "Battery Storage Microgrids for Rural Communities",
        description: "Creating microgrids using repurposed EV batteries to provide reliable electricity to rural communities. This would address energy poverty while extending battery life cycles.",
        author: "Sarah Johnson",
        organization: "GreenTech Solutions",
        tags: ["Energy Access", "Second-Life"]
      },
      {
        title: "Mobile Battery Diagnostic Labs",
        description: "Deploying mobile diagnostic labs that can visit communities to assess, repair, and collect batteries. This would increase collection rates in areas with limited recycling infrastructure.",
        author: "Michael Chen",
        organization: "CleanEnergy Institute",
        tags: ["Infrastructure", "Collection"]
      },
      {
        title: "Educational Battery Recycling Program",
        description: "Developing educational programs for schools to teach students about battery recycling and sustainable energy. Includes hands-on workshops and collection drives.",
        author: "Elena Rodriguez",
        organization: "Sustainable Future NGO",
        tags: ["Education", "Community"]
      }
    ];

    ideasData.forEach(idea => {
      this.createIdea(idea);
    });
  }

  private seedMarketplaceItems() {
    const marketplaceItemsData = [
      {
        name: "Tesla Model S Battery Pack",
        category: "ev-batteries",
        description: "Used Tesla Model S battery pack in excellent condition",
        condition: "excellent",
        specifications: "85 kWh | 90% Capacity",
        price: 3500,
        stock: 5,
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba53b0998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        name: "Nissan Leaf Battery Module",
        category: "ev-batteries",
        description: "Used Nissan Leaf battery module, good condition",
        condition: "good",
        specifications: "24 kWh | 75% Capacity",
        price: 1200,
        stock: 12,
        imageUrl: "https://images.unsplash.com/photo-1585952055991-ead699bf8480?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        name: "Home Energy Storage System",
        category: "energy-storage",
        description: "Refurbished home energy storage system",
        condition: "excellent",
        specifications: "10 kWh | Refurbished",
        price: 4200,
        stock: 3,
        imageUrl: "https://images.unsplash.com/photo-1603506731425-3ebb9f442c85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        name: "Electric Bike Battery Pack",
        category: "ev-batteries",
        description: "Used e-bike battery in fair condition",
        condition: "fair",
        specifications: "48V 15Ah | 55% Capacity",
        price: 250,
        stock: 8,
        imageUrl: "https://images.unsplash.com/photo-1561316441-efd0c9a356e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        name: "Battery Management System",
        category: "components",
        description: "New universal battery management system",
        condition: "new",
        specifications: "Universal | 100A max",
        price: 350,
        stock: 15,
        imageUrl: "https://images.unsplash.com/photo-1558428808-c8bf12580413?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        name: "Solar Battery Combo Kit",
        category: "energy-storage",
        description: "Solar panel and battery storage combo kit",
        condition: "good",
        specifications: "5 kWh | Solar panels included",
        price: 2800,
        stock: 2,
        imageUrl: "https://images.unsplash.com/photo-1612708771321-1cee78462161?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        name: "Portable Power Station",
        category: "energy-storage",
        description: "Portable power station with lithium battery",
        condition: "excellent",
        specifications: "1.5 kWh | 2000W inverter",
        price: 950,
        stock: 7,
        imageUrl: "https://images.unsplash.com/photo-1611274294780-13c87a3ebc7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        name: "Battery Testing Equipment",
        category: "accessories",
        description: "Professional grade battery testing equipment",
        condition: "new",
        specifications: "Professional grade | Calibrated",
        price: 480,
        stock: 4,
        imageUrl: "https://images.unsplash.com/photo-1594818898109-44704fb548f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
      }
    ];

    marketplaceItemsData.forEach(item => {
      this.createMarketplaceItem(item);
    });
  }
}

export const storage = new MemStorage();
