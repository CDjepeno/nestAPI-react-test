export class APIError {
  statusCode: number | never;
  message: string;

  constructor({
    statusCode,
    message,
  }: {
    statusCode: number;
    message: string;
  }) {
    this.message = message;

    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}

export class InternalServerError extends APIError {
  constructor(message: string) {
    super({ statusCode: 500, message });
  }
}

export class NotFound extends APIError {
  constructor(message: string) {
    super({ statusCode: 404, message });
  }
}

export class Unauthorized extends APIError {
  constructor(message: string) {
    super({ statusCode: 401, message });
  }
}
