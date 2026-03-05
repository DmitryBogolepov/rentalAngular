import { ActiveParamsType } from "../../../types/active-params.type";

export class ActiveParamsUtil {
  static processParams(params: Record<string, any>): ActiveParamsType {
    const processedParams: ActiveParamsType = { rooms: [] };

    if (params.hasOwnProperty('page')) {
      processedParams.page = +params['page'];
    }

    if (params.hasOwnProperty('sort')) {
      processedParams.sort = params['sort'];
    }

    if (params.hasOwnProperty('rooms')) {
      if (Array.isArray(params['rooms'])) {
        processedParams.rooms = params['rooms'];
      } else if (typeof params['rooms'] === 'string') {
        processedParams.rooms = params['rooms'].split(',').filter((r: string) => r.trim() !== '');
      }
    }

    if (params.hasOwnProperty('priceFrom')) {
      processedParams.priceFrom = +params['priceFrom'];
    }

    if (params.hasOwnProperty('priceTo')) {
      processedParams.priceTo = +params['priceTo'];
    }

    if (params.hasOwnProperty('rentalTypes')) {
      if (Array.isArray(params['rentalTypes'])) {
        processedParams.rentalTypes = params['rentalTypes'];
      } else if (typeof params['rentalTypes'] === 'string') {
        // Если приходит как строка с запятыми
        processedParams.rentalTypes = params['rentalTypes'].split(',').filter((t: string) => t.trim() !== '');
      }
    }

    return processedParams;
  }
}
