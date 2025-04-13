import { 
  User, InsertUser, 
  Battery, InsertBattery, 
  Order, InsertOrder, 
  Idea, InsertIdea, 
  Product, InsertProduct, 
  Subsidy, InsertSubsidy, 
  Analytics, InsertAnalytics
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Battery operations
  createBattery(battery: InsertBattery & { price: number, userId?: number }): Promise<Battery>;
  getBattery(id: number): Promise<Battery | undefined>;
  getBatteries(): Promise<Battery[]>;
  getBatteriesByUser(userId: number): Promise<Battery[]>;
  
  // Order operations
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrders(): Promise<Order[]>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Idea operations
  createIdea(idea: InsertIdea): Promise<Idea>;
  getIdea(id: number): Promise<Idea | undefined>;
  getIdeas(): Promise<Idea[]>;
  voteForIdea(id: number): Promise<Idea | undefined>;
  
  // Product operations
  createProduct(product: InsertProduct): Promise<Product>;
  getProduct(id: number): Promise<Product | undefined>;
  getProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  filterProducts(filters: any): Promise<Product[]>;
  
  // Subsidy operations
  createSubsidy(subsidy: InsertSubsidy): Promise<Subsidy>;
  getSubsidy(id: number): Promise<Subsidy | undefined>;
  getSubsidies(): Promise<Subsidy[]>;
  getSubsidiesByState(state: string): Promise<Subsidy[]>;
  getSubsidiesByCategory(category: string): Promise<Subsidy[]>;
  
  // Analytics operations
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalytics(category: string): Promise<Analytics[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private batteries: Map<number, Battery>;
  private orders: Map<number, Order>;
  private ideas: Map<number, Idea>;
  private products: Map<number, Product>;
  private subsidies: Map<number, Subsidy>;
  private analytics: Map<number, Analytics>;
  
  private userId: number;
  private batteryId: number;
  private orderId: number;
  private ideaId: number;
  private productId: number;
  private subsidyId: number;
  private analyticsId: number;
  
  constructor() {
    this.users = new Map();
    this.batteries = new Map();
    this.orders = new Map();
    this.ideas = new Map();
    this.products = new Map();
    this.subsidies = new Map();
    this.analytics = new Map();
    
    this.userId = 1;
    this.batteryId = 1;
    this.orderId = 1;
    this.ideaId = 1;
    this.productId = 1;
    this.subsidyId = 1;
    this.analyticsId = 1;
    
    this.initializeData();
  }
  
  private initializeData() {
    // Create sample analytics data
    this.createAnalytics({
      name: "Annual Growth",
      value: 24.8,
      unit: "%",
      category: "growth",
      data: {
        years: ["2019", "2020", "2021", "2022", "2023"],
        values: [10.2, 14.5, 18.3, 22.1, 24.8]
      }
    });
    
    this.createAnalytics({
      name: "CO₂ Reduction",
      value: 142000,
      unit: "tons",
      category: "environment",
      data: {
        batteryTypes: ["EV Standard", "EV Premium", "Hybrid", "Energy Storage", "Other"],
        values: [68000, 42000, 18000, 10000, 4000]
      }
    });
    
    this.createAnalytics({
      name: "Materials Recovered",
      value: 18300,
      unit: "tons",
      category: "materials",
      data: {
        materials: ["Lithium", "Cobalt", "Nickel", "Copper", "Aluminum", "Other"],
        values: [3660, 4575, 5490, 2745, 1830, 0]
      }
    });

    // Create sample marketplace products
    const productImages = [
      "https://images.unsplash.com/photo-1593941707882-a5bba53aaf95",
      "https://images.unsplash.com/photo-1558620473-e3e0e5584397",
      "https://images.unsplash.com/photo-1618317437869-df0e87bc1cee",
      "https://images.unsplash.com/photo-1597347316205-36f6c451902a",
      "https://images.unsplash.com/photo-1529310399831-ed472b81d589",
      "https://images.unsplash.com/photo-1622825457752-53745df9c606",
      "https://images.unsplash.com/photo-1599689444589-133726279f75",
      "https://images.unsplash.com/photo-1547027248-4534b9d2d28f"
    ];

    const products = [
      {
        name: "Tesla Model S Battery Module",
        description: "Refurbished Tesla Model S battery module in excellent condition, perfect for DIY energy projects",
        type: "EV Battery",
        price: 1200,
        capacity: 5.3,
        condition: "Refurbished (Grade A)",
        capacityPercentage: 85,
        tags: ["Tesla", "EV", "Module"]
      },
      {
        name: "Nissan Leaf Battery Pack",
        description: "Complete battery pack from a Nissan Leaf with good capacity retention",
        type: "EV Battery",
        price: 3500,
        capacity: 24,
        condition: "Refurbished (Grade B)",
        capacityPercentage: 72,
        tags: ["Nissan", "EV", "Complete Pack"]
      },
      {
        name: "Home Energy Storage System",
        description: "Complete home energy storage system built with recycled EV battery materials",
        type: "Energy Storage",
        price: 4800,
        capacity: 13.5,
        condition: "New (Recycled Materials)",
        capacityPercentage: 100,
        tags: ["Storage", "Home", "Complete System"]
      },
      {
        name: "Recycled Lithium Cells (18650)",
        description: "Pack of 100 tested and sorted 18650 lithium cells from recycled battery packs",
        type: "Cells",
        price: 225,
        capacity: 0.1,
        condition: "Tested & Sorted",
        capacityPercentage: 80,
        tags: ["DIY", "18650", "Cells"]
      },
      {
        name: "EV Charger with Battery Backup",
        description: "Level 2 EV charger with integrated battery backup for power outages",
        type: "Charger",
        price: 2750,
        capacity: 9.6,
        condition: "Refurbished",
        capacityPercentage: 90,
        tags: ["Charger", "Backup", "Level 2"]
      },
      {
        name: "Chevy Volt Battery Modules",
        description: "Individual battery modules from a Chevy Volt, ideal for solar storage projects",
        type: "EV Battery",
        price: 425,
        capacity: 2,
        condition: "Tested & Certified",
        capacityPercentage: 80,
        tags: ["Chevy", "Module", "Solar"]
      },
      {
        name: "Solar Generator with Recycled Battery",
        description: "Portable solar generator using recycled EV battery cells with included 100W panel",
        type: "Portable",
        price: 1150,
        capacity: 2,
        condition: "New (Recycled Materials)",
        capacityPercentage: 100,
        tags: ["Solar", "Portable", "Generator"]
      },
      {
        name: "E-Bike Kit w/ Recycled Battery",
        description: "Complete e-bike conversion kit including motor and recycled battery pack",
        type: "E-Bike",
        price: 685,
        capacity: 0.48,
        condition: "New (Recycled Materials)",
        capacityPercentage: 100,
        tags: ["E-Bike", "Conversion", "Kit"]
      }
    ];

    products.forEach((product, index) => {
      this.createProduct({
        ...product,
        image: productImages[index % productImages.length]
      });
    });

    // Create sample ideas
    this.createIdea({
      title: "Rural Energy Storage",
      description: "Creating battery storage systems using recycled EV batteries to provide reliable electricity in rural villages without consistent grid access.",
      organization: "GreenEnergy Foundation",
      orgType: "Non-profit Organization",
      contactName: "Alex Green",
      contactEmail: "alex@greenenergy.org",
      tags: ["Energy", "Rural"]
    });

    this.createIdea({
      title: "Educational Workshops",
      description: "Developing hands-on workshops for schools to teach students about battery technology, recycling processes, and sustainable energy.",
      organization: "TechEd Institute",
      orgType: "Educational Institution",
      contactName: "Maria Rodriguez",
      contactEmail: "maria@teched.edu",
      tags: ["Education", "Youth"]
    });

    this.createIdea({
      title: "Disaster Response Power",
      description: "Deploying mobile power stations using recycled batteries to provide emergency electricity during natural disasters and power outages.",
      organization: "Emergency Relief Network",
      orgType: "Non-profit Organization",
      contactName: "John Thompson",
      contactEmail: "john@emergencyrelief.org",
      tags: ["Emergency", "Community"]
    });

    // Create sample subsidies for India
    const federalSubsidies = [
      {
        title: "FAME-II Scheme",
        description: "Faster Adoption and Manufacturing of Electric Vehicles (FAME-II) provides incentives for EV purchases and battery recycling programs.",
        provider: "Ministry of Heavy Industries, Government of India",
        category: "Central Government Schemes",
        eligibility: "EV manufacturers and consumers purchasing electric vehicles with advanced batteries",
        amount: "Up to ₹1,50,000 for electric vehicles",
        link: "https://fame2.heavyindustries.gov.in/"
      },
      {
        title: "PLI Scheme for ACC Batteries",
        description: "Production Linked Incentive (PLI) Scheme for Advanced Chemistry Cell (ACC) Battery Manufacturing with focus on recycling components.",
        provider: "Ministry of Heavy Industries, Government of India",
        category: "Central Government Schemes",
        eligibility: "Battery manufacturers with recycling capabilities",
        amount: "₹18,100 Crore total outlay",
        link: "https://pib.gov.in/PressReleasePage.aspx?PRID=1716525"
      },
      {
        title: "National Program on Advanced Chemistry Cell Battery Storage",
        description: "Initiative to establish domestic battery manufacturing and recycling ecosystem in India.",
        provider: "NITI Aayog, Government of India",
        category: "Central Government Schemes",
        eligibility: "Research institutions and battery manufacturing companies",
        amount: "₹1,000-5,000 Crore",
        link: "https://www.niti.gov.in/"
      }
    ];

    federalSubsidies.forEach(subsidy => {
      this.createSubsidy(subsidy);
    });

    const stateSubsidies = [
      {
        title: "Delhi EV Policy",
        description: "Comprehensive incentives for EV adoption and battery recycling infrastructure in Delhi.",
        provider: "Delhi Transport Department",
        category: "State & Local Programs",
        state: "Delhi",
        eligibility: "Delhi-registered businesses and residents",
        amount: "Up to ₹1,50,000 for EVs and ₹30,000 for recycling",
        link: "https://ev.delhi.gov.in/policy"
      },
      {
        title: "Maharashtra EV Policy",
        description: "Early bird incentives for EV purchases and additional support for battery recycling infrastructure.",
        provider: "Maharashtra State EV Department",
        category: "State & Local Programs",
        state: "Maharashtra",
        eligibility: "Maharashtra residents and businesses",
        amount: "Up to ₹2,75,000 for EVs",
        link: "https://evreporter.com/maharashtra-ev-policy-2021/"
      },
      {
        title: "Gujarat EV Policy",
        description: "Capital subsidies and incentives for setting up battery recycling and swapping infrastructure.",
        provider: "Gujarat Energy Development Agency",
        category: "State & Local Programs",
        state: "Gujarat",
        eligibility: "Gujarat-based businesses and fleet operators",
        amount: "Up to ₹10,00,000 for recycling units",
        link: "https://geda.gujarat.gov.in/"
      },
      {
        title: "Karnataka Electric Vehicle Policy",
        description: "R&D support for battery recycling technologies and EV manufacturing in the state.",
        provider: "Karnataka Renewable Energy Development Ltd.",
        category: "State & Local Programs",
        state: "Karnataka",
        eligibility: "Karnataka-based manufacturers and research institutions",
        amount: "25% capital subsidy on equipment",
        link: "https://kreditsldc.in/"
      }
    ];

    stateSubsidies.forEach(subsidy => {
      this.createSubsidy(subsidy);
    });

    const utilitySubsidies = [
      {
        title: "Tata Power Storage Incentives",
        description: "Incentives for using second-life EV batteries for residential solar storage solutions.",
        provider: "Tata Power",
        category: "Utility Incentives",
        eligibility: "Tata Power residential customers with solar installations",
        amount: "₹5,000-₹50,000",
        link: "https://www.tatapower.com/solar-rooftop"
      },
      {
        title: "BSES Off-Peak Charging Program",
        description: "Special EV charging rates during off-peak hours (11PM-6AM) in Delhi NCR.",
        provider: "BSES Rajdhani & Yamuna",
        category: "Utility Incentives",
        eligibility: "BSES customers with registered EVs",
        amount: "Up to 40% off standard electricity rates",
        link: "https://www.bsesdelhi.com/web/bses/green-initiatives"
      },
      {
        title: "Reliance Energy Grid Balance Program",
        description: "Financial incentives for allowing utility-controlled discharge of home battery systems during peak demand.",
        provider: "Reliance Energy",
        category: "Utility Incentives",
        eligibility: "Customers with battery storage systems",
        amount: "₹500-₹2,000 per month",
        link: "https://www.relianceenergy.in"
      },
      {
        title: "EESL Battery Recycling Incentive",
        description: "Energy Efficiency Services Limited program providing rebates for recycling old EV and energy storage batteries.",
        provider: "Energy Efficiency Services Limited (EESL)",
        category: "Utility Incentives",
        eligibility: "All battery owners",
        amount: "₹1,000-₹15,000 depending on battery type",
        link: "https://eeslindia.org/"
      }
    ];

    utilitySubsidies.forEach(subsidy => {
      this.createSubsidy(subsidy);
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Battery operations
  async createBattery(battery: InsertBattery & { price: number, userId?: number }): Promise<Battery> {
    const id = this.batteryId++;
    const now = new Date();
    const newBattery: Battery = { 
      ...battery, 
      id, 
      createdAt: now 
    };
    this.batteries.set(id, newBattery);
    return newBattery;
  }
  
  async getBattery(id: number): Promise<Battery | undefined> {
    return this.batteries.get(id);
  }
  
  async getBatteries(): Promise<Battery[]> {
    return Array.from(this.batteries.values());
  }
  
  async getBatteriesByUser(userId: number): Promise<Battery[]> {
    return Array.from(this.batteries.values()).filter(
      (battery) => battery.userId === userId,
    );
  }
  
  // Order operations
  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.orderId++;
    const now = new Date();
    const newOrder: Order = { ...order, id, createdAt: now };
    this.orders.set(id, newOrder);
    return newOrder;
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder: Order = { ...order, status: status as any };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Idea operations
  async createIdea(idea: InsertIdea): Promise<Idea> {
    const id = this.ideaId++;
    const now = new Date();
    const newIdea: Idea = { ...idea, id, votes: 0, createdAt: now };
    this.ideas.set(id, newIdea);
    return newIdea;
  }
  
  async getIdea(id: number): Promise<Idea | undefined> {
    return this.ideas.get(id);
  }
  
  async getIdeas(): Promise<Idea[]> {
    return Array.from(this.ideas.values());
  }
  
  async voteForIdea(id: number): Promise<Idea | undefined> {
    const idea = this.ideas.get(id);
    if (!idea) return undefined;
    
    const updatedIdea: Idea = { ...idea, votes: idea.votes + 1 };
    this.ideas.set(id, updatedIdea);
    return updatedIdea;
  }
  
  // Product operations
  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const now = new Date();
    const newProduct: Product = { ...product, id, createdAt: now };
    this.products.set(id, newProduct);
    return newProduct;
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async searchProducts(query: string): Promise<Product[]> {
    if (!query) return this.getProducts();
    
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.type.toLowerCase().includes(lowerQuery) ||
        product.condition.toLowerCase().includes(lowerQuery) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }
  
  async filterProducts(filters: any): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (filters.type && filters.type !== "All Types") {
      products = products.filter(p => p.type === filters.type);
    }
    
    if (filters.condition && filters.condition !== "All Conditions") {
      products = products.filter(p => p.condition === filters.condition);
    }
    
    if (filters.minPrice) {
      products = products.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      products = products.filter(p => p.price <= filters.maxPrice);
    }
    
    if (filters.capacity && filters.capacity !== "All Capacities") {
      // Handle capacity filtering based on selected range
      if (filters.capacity === "Small (< 20 kWh)") {
        products = products.filter(p => p.capacity && p.capacity < 20);
      } else if (filters.capacity === "Medium (20-60 kWh)") {
        products = products.filter(p => p.capacity && p.capacity >= 20 && p.capacity <= 60);
      } else if (filters.capacity === "Large (60-100 kWh)") {
        products = products.filter(p => p.capacity && p.capacity > 60 && p.capacity <= 100);
      } else if (filters.capacity === "Industrial (> 100 kWh)") {
        products = products.filter(p => p.capacity && p.capacity > 100);
      }
    }
    
    return products;
  }
  
  // Subsidy operations
  async createSubsidy(subsidy: InsertSubsidy): Promise<Subsidy> {
    const id = this.subsidyId++;
    const now = new Date();
    const newSubsidy: Subsidy = { ...subsidy, id, createdAt: now };
    this.subsidies.set(id, newSubsidy);
    return newSubsidy;
  }
  
  async getSubsidy(id: number): Promise<Subsidy | undefined> {
    return this.subsidies.get(id);
  }
  
  async getSubsidies(): Promise<Subsidy[]> {
    return Array.from(this.subsidies.values());
  }
  
  async getSubsidiesByState(state: string): Promise<Subsidy[]> {
    if (!state || state === "Select state") return this.getSubsidies();
    
    return Array.from(this.subsidies.values()).filter(
      (subsidy) => subsidy.state === state
    );
  }
  
  async getSubsidiesByCategory(category: string): Promise<Subsidy[]> {
    if (!category || category === "All incentives") return this.getSubsidies();
    
    return Array.from(this.subsidies.values()).filter(
      (subsidy) => subsidy.category === category
    );
  }
  
  // Analytics operations
  async createAnalytics(analytics: InsertAnalytics): Promise<Analytics> {
    const id = this.analyticsId++;
    const now = new Date();
    const newAnalytics: Analytics = { ...analytics, id, createdAt: now };
    this.analytics.set(id, newAnalytics);
    return newAnalytics;
  }
  
  async getAnalytics(category?: string): Promise<Analytics[]> {
    if (!category) return Array.from(this.analytics.values());
    
    return Array.from(this.analytics.values()).filter(
      (analytics) => analytics.category === category
    );
  }
}

export const storage = new MemStorage();
