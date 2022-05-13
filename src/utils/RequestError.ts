import { StatusCodes } from 'http-status-codes';

interface IRequestError {
  message: string,
  status: StatusCodes, 
}

class RequestError extends Error implements IRequestError {
  public message;

  public status;

  constructor(message: string, status: StatusCodes) {
    super();

    this.message = message;
    this.status = status;
  }
}

export default RequestError;