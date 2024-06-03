import {Report} from '../../domain/entities/report.entity';

export class ReportMapper {
  static fromFirestoreData(data: any): Report {
    return {
      ids: data.id,
      vin: data.vin,
      observations: data.observations,
      status: data.status,
      generatorId: data.generatorId,
      createdAt: data.createdAt.toDate(),
    };
  }
}
