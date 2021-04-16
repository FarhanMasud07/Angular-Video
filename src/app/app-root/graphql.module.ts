import {NgModule} from '@angular/core';
import {HttpClientModule, HttpHandler, HttpHeaders} from '@angular/common/http';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-link';
import {environment} from "../../environments/environment";
import {onError} from "apollo-link-error";
import {AuthService} from "./services/auth-service/auth-service";
import jwt_decode from 'jwt-decode';
import {BehaviorSubject, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
// const uri = environment.graphQlEndPoint;
//
//
// const refreshTokenFunc = (apollo: Apollo) => {
//   debugger
//   const token = localStorage.getItem("token");
//   const rToken = localStorage.getItem("refreshToken");
//   return apollo
//     .query({
//       query: gql`{
//           refreshTokens(token:"${token}",refreshToken:"${rToken}"){token refreshToken}
//          }
//         `,
//       variables: {token, rToken}
//       // mutation: gql`
//       //   mutation{
//       //     refreshTokens(
//       //       token:"${token}"
//       //       refreshToken:"${rToken}"
//       //     ){ token refreshToken }
//       //   }`,
//       // variables: {token, rToken}
//     })
//     .pipe(map((response: any) => {
//       if (response) {
//         console.log(response, 'refreshtoken');
//         if (response?.data?.refreshTokens?.token) {
//           localStorage.setItem("token", response.data.refreshTokens.token);
//         }
//         if (response?.data?.refreshTokens?.refreshToken) {
//           localStorage.setItem("refreshToken", response.data.refreshTokens.refreshToken)
//         }
//         return response;
//       }
//       return null;
//     }));
// }
//
// export function createApollo(httpLink: HttpLink, apollo: Apollo, authService: AuthService) {
//
//   // const auth = setContext((operation, context) => {
//   //   const token: any = localStorage.getItem('token');
//   //
//   //   if (!token) {
//   //     return {};
//   //   } else {
//   //
//       const isTokenExpired: any = jwt_decode(token);
//       const expirationTime = (isTokenExpired.exp * 1000);
//       const dateTime = Date.now();
//       debugger
//       if (dateTime < expirationTime) {
//         return {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         };
//       }
//   //     return authService.refreshTokenFunc()
//   //       .subscribe((response: any) => {
//   //         if (response) {
//   //           return {
//   //             headers: {
//   //               Authorization: `Bearer ${token}`
//   //             }
//   //           };
//   //         }
//   //         return {};
//   //       });
//   //     // refreshTokenFunc(apollo)
//   //     //   .subscribe((response: any) => {
//   //     //     if (response) {
//   //     //       return {
//   //     //         headers: {
//   //     //           Authorization: `Bearer ${token}`
//   //     //         }
//   //     //       };
//   //     //     }
//   //     //     return {};
//   //     //   });
//   //
//   //
//   //   }
//   // });
//
//   const auth = setContext(async (_, {headers}) => {
//     // Grab token if there is one in storage or hasn't expired
//     const token: any = localStorage.getItem('token');
//
//     if (!token) {
//       return {};
//     }
//
//     const isTokenExpired: any = jwt_decode(token);
//     const expirationTime = (isTokenExpired.exp * 1000);
//     const dateTime = Date.now();
//     debugger
//     if (dateTime < expirationTime) {
//       return {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       };
//     }
//
//     authService.refreshTokenFunc();
//     // Return the headers as usual
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   });
//
//   const errorLink: any = onError(({graphQLErrors, networkError}) => {
//     if (graphQLErrors)
//       graphQLErrors.map(({message, locations, path}) =>
//         console.log(
//         ),
//       );
//     if (networkError) {
//     }
//   });
//
//
//   const link = ApolloLink.from([auth, errorLink, httpLink.create({uri})]);
//   const cache = new InMemoryCache();
//
//   return {
//     link,
//     cache
//   }
// }

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
})
export class GraphQLModule {

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
  ) {
    const uri = environment.graphQlEndPoint;
    const http = httpLink.create({uri});

    apollo.create({
      link: this.middleware().concat(http),
      cache: new InMemoryCache()
    });
  }

  private middleware() {
    return new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('JWT_TOKEN')
        }
      });
      return forward(operation);
    });
  }
}
