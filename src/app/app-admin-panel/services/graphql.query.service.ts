import {Injectable, OnInit} from "@angular/core";
import {gql} from "@apollo/client/core";
import {Apollo} from "apollo-angular";
import {map} from "rxjs/operators";
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GqlQueryService {

  events: any;

  constructor(
    private apollo: Apollo
  ) {
  }

  getDataByGql(Entity: string, Fields: string[]): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          {${Entity}{ ${Fields} }}`,
      })
      .valueChanges.pipe(map((response: any) => {
        if (response.data) {
          return response.data
        }
        return null;
      }));
  }

}
