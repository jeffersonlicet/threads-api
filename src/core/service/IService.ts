export interface ServiceConstructor {
  new(): IService;
}

export interface IService {
  boot(): Promise<any>|void;
  [key: string]: any;
}
