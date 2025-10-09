import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private readonly storage = sessionStorage;

  public get<T>(key: string): T {
    const data = this.storage.getItem(key);
    return data ? JSON.parse(data) : (null as T);
  }

  public set(key: string, payload: string): void {
    this.storage.setItem(key, payload);
  }

  public clear(): void {
    this.storage.clear();
  }
}
