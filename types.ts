export interface emojiUsageRankArray {
  rankings: {
    PartialEmoji_str: string;
    rank: number;
    usage_count: number;
  }[];
  hour: number;
  total: number;
}
