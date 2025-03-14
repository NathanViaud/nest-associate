import { Injectable } from '@nestjs/common';

@Injectable()
export class BlacklistService {
  private blacklist = new Set<string>();

  addTokenToBlacklist(token: string) {
    this.blacklist.add(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklist.has(token);
  }
}
