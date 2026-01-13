import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDataService } from '../services/newsdata.service';
import { RssService } from '../services/rss.service';
import { NewsApiResponse } from '../models/NewsApiResponse';
import { Article } from '../models/Article';
import { environment } from '../../environments/environment';
import { forkJoin } from 'rxjs';
import { RssItem } from '../models/RssItem';

// 🔹 Define a type for feed names to ensure type safety
type FeedName = 'economicTimes' | 'mint' | 'businessStandard' | 'moneycontrol' | 'ndtvProfit';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // 🔹 News API
  newsApiResponse!: NewsApiResponse;
  articles: Article[] = [];
  selectedCountry: string = 'in';

  // 🔹 RSS Feeds
  economicTimes: RssItem[] = [];
  mint: RssItem[] = [];
  businessStandard: RssItem[] = [];
  moneycontrol: RssItem[] = [];
  ndtvProfit: RssItem[] = [];

  // 🔹 Virtual Scroll States
  showAllEconomicTimes = false;
  showAllMint = false;
  showAllBusinessStandard = false;
  showAllMoneycontrol = false;
  showAllNdtvProfit = false;

  // 🔹 Scroll positions - properly typed with FeedName as key
  scrollPositions: Record<FeedName, number> = {
    economicTimes: 0,
    mint: 0,
    businessStandard: 0,
    moneycontrol: 0,
    ndtvProfit: 0
  };

  // 🔹 Visible items cache (for virtual scroll)
  private visibleItemsCache = new Map<string, RssItem[]>();

  constructor(
    private newsDataService: NewsDataService,
    private rssService: RssService
  ) { }

  ngOnInit(): void {
    this.loadNews();
    this.loadBusinessFeeds();
  }

  loadNews(): void {
    this.newsDataService.getLatestNewsByCountry(this.selectedCountry)
      .subscribe(res => {
        this.newsApiResponse = res;
        this.articles = res.results;
      });
  }

  loadBusinessFeeds(): void {
    forkJoin({
      economictimes: this.rssService.getRssFeed(environment.businessRss.economictimes),
      mint: this.rssService.getRssFeed(environment.businessRss.mint),
      businessStandard: this.rssService.getRssFeed(environment.businessRss.businessStandard),
      moneycontrol: this.rssService.getRssFeed(environment.businessRss.moneycontrol),
      ndtvProfit: this.rssService.getRssFeed(environment.businessRss.ndtvProfit),
    }).subscribe(res => {
      this.economicTimes = res.economictimes || [];
      this.mint = res.mint || [];
      this.businessStandard = res.businessStandard || [];
      this.moneycontrol = res.moneycontrol || [];
      this.ndtvProfit = res.ndtvProfit || [];

      // Clear cache when data changes
      this.visibleItemsCache.clear();

      // Setup scroll listeners after data loads
      setTimeout(() => this.setupScrollListeners(), 100);
    });
  }

  // 🔹 Get visible items for virtual scroll (first 10 unless expanded)
  getVisibleItems(feed: RssItem[], feedName: FeedName): RssItem[] {
    if (!feed || feed.length === 0) return [];

    // Check cache first
    const cacheKey = `${feedName}_${this.isShowAll(feedName)}`;
    if (this.visibleItemsCache.has(cacheKey)) {
      return this.visibleItemsCache.get(cacheKey)!;
    }

    let visibleItems: RssItem[];

    if (this.isShowAll(feedName)) {
      // Show all items
      visibleItems = [...feed];
    } else {
      // Show only first 10 items
      visibleItems = feed.slice(0, 10);
    }

    // Cache the result
    this.visibleItemsCache.set(cacheKey, visibleItems);
    return visibleItems;
  }

  // 🔹 Toggle between showing all items and first 10
  toggleViewMore(feedName: FeedName): void {
    // Save current scroll position
    this.saveScrollPosition(feedName);

    // Toggle state
    switch (feedName) {
      case 'economicTimes':
        this.showAllEconomicTimes = !this.showAllEconomicTimes;
        break;
      case 'mint':
        this.showAllMint = !this.showAllMint;
        break;
      case 'businessStandard':
        this.showAllBusinessStandard = !this.showAllBusinessStandard;
        break;
      case 'moneycontrol':
        this.showAllMoneycontrol = !this.showAllMoneycontrol;
        break;
      case 'ndtvProfit':
        this.showAllNdtvProfit = !this.showAllNdtvProfit;
        break;
    }

    // Clear cache for this feed
    this.visibleItemsCache.delete(`${feedName}_${!this.isShowAll(feedName)}`);
    this.visibleItemsCache.delete(`${feedName}_${this.isShowAll(feedName)}`);

    // Restore scroll position after view change
    setTimeout(() => this.restoreScrollPosition(feedName), 50);
  }

  // 🔹 Check if showing all items for a feed
  isShowAll(feedName: FeedName): boolean {
    switch (feedName) {
      case 'economicTimes': return this.showAllEconomicTimes;
      case 'mint': return this.showAllMint;
      case 'businessStandard': return this.showAllBusinessStandard;
      case 'moneycontrol': return this.showAllMoneycontrol;
      case 'ndtvProfit': return this.showAllNdtvProfit;
      default: return false;
    }
  }

  // 🔹 Get button text for toggle
  getToggleButtonText(feed: RssItem[], feedName: FeedName): string {
    const showAll = this.isShowAll(feedName);
    if (showAll) {
      return 'Show Less';
    } else {
      return `View More (${feed.length} articles)`;
    }
  }

  // 🔹 TrackBy function for better Angular performance
  trackByFn(index: number, item: RssItem): string {
    return item.link || `${item.title}_${index}`;
  }

  // 🔹 Get container height based on item count (for virtual scroll)
  getContainerHeight(itemCount: number, expanded: boolean): number {
    const visibleCount = expanded ? itemCount : Math.min(itemCount, 10);
    const itemHeight = 70; // Same as CSS item height
    const maxHeight = 500; // Max container height

    return Math.min(visibleCount * itemHeight, maxHeight);
  }

  // 🔹 Save scroll position for a specific feed
  private saveScrollPosition(feedName: FeedName): void {
    const container = this.getFeedContainer(feedName);
    if (container) {
      this.scrollPositions[feedName] = container.scrollTop;
    }
  }

  // 🔹 Restore scroll position for a specific feed
  private restoreScrollPosition(feedName: FeedName): void {
    const container = this.getFeedContainer(feedName);
    if (container && this.scrollPositions[feedName] > 0) {
      container.scrollTop = this.scrollPositions[feedName];
    }
  }

  // 🔹 Get feed container element
  private getFeedContainer(feedName: FeedName): HTMLElement | null {
    // This is a simplified selector - adjust based on your actual DOM structure
    return document.querySelector(`[data-feed="${feedName}"] .virtual-scroll-container`);
  }

  // 🔹 Setup scroll listeners for virtual scroll containers
  private setupScrollListeners(): void {
    const containers = document.querySelectorAll('.virtual-scroll-container');
    containers.forEach(container => {
      // You can implement more advanced virtual scrolling here
      // For now, we're using simple overflow with fixed height
      container.addEventListener('scroll', (event) => {
        // Optional: Implement lazy loading or windowing here
        // For large datasets, you would calculate which items are visible
        // and only render those
      });
    });
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  }


  // 🔹 Check if feed has more than 10 items
  hasMoreThanTen(feed: RssItem[]): boolean {
    return feed && feed.length > 10;
  }

  // 🔹 Alternative: Type guard to check if a string is a valid FeedName
  private isValidFeedName(name: string): name is FeedName {
    return ['economicTimes', 'mint', 'businessStandard', 'moneycontrol', 'ndtvProfit'].includes(name);
  }

  // 🔹 Safe method to handle dynamic feed names (if needed)
  private safeScrollPositionAccess(feedName: string): number | null {
    if (this.isValidFeedName(feedName)) {
      return this.scrollPositions[feedName];
    }
    return null;
  }

  getLastUpdatedTime(feed: RssItem[]): string {
    const mostRecent = feed[0]; // Assuming feed is sorted by date
    if (mostRecent.published) {
      const date = new Date(mostRecent.published);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays < 7) return `${diffDays} days ago`;
      return this.formatDate(mostRecent.published);
    }

    if (!feed || feed.length === 0) return 'No updates';
    return 'Recently';
  }

  // Get summary preview (truncated)

  getSummaryPreview(summary: string | undefined): string {
    if (!summary) return '';
    if (summary.length <= 60) return summary;
    return summary.substring(0, 60) + '...';
  }
}