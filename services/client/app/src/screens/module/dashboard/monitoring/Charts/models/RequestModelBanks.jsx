export class RequestModelBanks {
  constructor(
    bankIds,
    clientTypeIds,
    chartTypeId,
    limitRange,
    interestRange,
    timeRange
  ) {
    this.bankIds = bankIds;
    this.clientTypeIds = clientTypeIds;
    this.chartTypeId = chartTypeId;
    this.limitRange = limitRange;
    this.interestRange = interestRange;
    this.timeRange = timeRange;
  }
}
