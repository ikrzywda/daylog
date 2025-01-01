export enum RequestState {
  LOADING = 'loading',
  ERROR = 'failed',
  SUCCESS = 'success',
}

interface PendingRequest {
  state: RequestState.LOADING;
}

interface FailedRequest {
  state: RequestState.ERROR;
  error: Error;
}

interface SuccessfulRequest<T> {
  state: RequestState.SUCCESS;
  data: T;
}

export type Request<T = unknown> =
  | SuccessfulRequest<T>
  | FailedRequest
  | PendingRequest;
