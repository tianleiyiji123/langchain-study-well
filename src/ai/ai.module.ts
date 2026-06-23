import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    {
      provide: 'CHAT_MODEL',
      useFactory: (configService: ConfigService) => {
        return new ChatOpenAI({
          model: configService.get('OPENAI_MODEL'),
          configuration: {
            apiKey: configService.get('OPENAI_API_KEY'),
            baseURL: configService.get('OPENAI_BASE_URL'),
          },
        });
      },
    },
  ],
})
export class AiModule {}
