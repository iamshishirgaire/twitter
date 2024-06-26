// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import { type PollsId } from './Polls';
import { type UsersId } from './Users';

/** Identifier type for public.poll_results */
export type PollResultsId = string & { __brand: 'PollResultsId' };

/** Represents the table public.poll_results */
export default interface PollResults {
  id: PollResultsId;

  poll_id: PollsId;

  user_id: UsersId;

  vote_option: number;

  created_at: Date;

  updated_at: Date;
}

/** Represents the initializer for the table public.poll_results */
export interface PollResultsInitializer {
  id: PollResultsId;

  poll_id: PollsId;

  user_id: UsersId;

  vote_option: number;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;

  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
}

/** Represents the mutator for the table public.poll_results */
export interface PollResultsMutator {
  id?: PollResultsId;

  poll_id?: PollsId;

  user_id?: UsersId;

  vote_option?: number;

  created_at?: Date;

  updated_at?: Date;
}
