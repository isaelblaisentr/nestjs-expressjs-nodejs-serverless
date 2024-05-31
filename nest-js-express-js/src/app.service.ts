import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom} from "rxjs";
import {AxiosError} from "axios";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly httpService: HttpService) {}

  async findRandomUser(): Promise<any> {
    const { data } = await firstValueFrom(
        this.httpService.get<any>('https://randomuser.me/api/').pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error?.response?.data);
              throw 'An error happened!';
            }),
        ),
    );
    return data;
  }
}
