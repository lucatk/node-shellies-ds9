import { Device } from '../devices';
import { Service } from './base';

export interface WebhookSupportedResponse {
  hook_types: string[];
}

export interface Webhook {
  id?: number;
  cid: number;
  enable: boolean;
  event: string;
  name: string | null;
  ssl_ca: '*' | 'user_ca.pem' | '' | null;
  urls: string[];
  active_between: string[] | null;
}

export interface WebhookListResponse {
  hooks: Webhook[];
}

export interface WebhookResponse {
  id: number;
}

/**
 * The Webhook service allows Shelly devices to send HTTP requests triggered by events.
 */
export class WebhookService extends Service {
  constructor(device: Device) {
    super('Webhook', device);
  }

  /**
   * Lists all supported event types.
   */
  listSupported(): PromiseLike<WebhookSupportedResponse> {
    return this.rpc<WebhookSupportedResponse>('ListSupported');
  }

  /**
   * Lists all existing webhooks.
   */
  list(): PromiseLike<WebhookListResponse> {
    return this.rpc<WebhookListResponse>('List');
  }

  /**
   * Creates a new webhook.
   * @param hook - The webhook to add.
   */
  create(hook: Webhook): PromiseLike<WebhookResponse> {
    return this.rpc<WebhookResponse>(
      'Create',
      { ...hook },
    );
  }

  /**
   * Updates an existing webhook.
   * @param hook - The webhook to update.
   */
  update(hook: Partial<Webhook>): PromiseLike<WebhookResponse> {
    return this.rpc<WebhookResponse>(
      'Update',
      { ...hook },
    );
  }

  /**
   * Deletes a webhook.
   * @param id - ID of the webhook to delete.
   */
  delete(id: number): PromiseLike<WebhookResponse> {
    return this.rpc<WebhookResponse>('Delete', {
      id,
    });
  }

  /**
   * Deletes all existing webhooks.
   */
  deleteAll(): PromiseLike<null> {
    return this.rpc<null>('DeleteAll');
  }
}