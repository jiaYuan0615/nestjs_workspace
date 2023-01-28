import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { DataSource } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(private dataSource: DataSource) { }

  public async getData() {
    const query = `SELECT * FROM invoice`
    const items = await this.dataSource.query(query)
    return items
  }
}
