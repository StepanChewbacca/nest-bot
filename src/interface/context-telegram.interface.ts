import { Context } from 'vm';
import { Update } from 'typegram/update.d';

export interface IContext extends Context {
  readonly update: Update.CallbackQueryUpdate &
    Update.ChannelPostUpdate &
    Update.ChosenInlineResultUpdate &
    Update.EditedChannelPostUpdate &
    Update.EditedMessageUpdate &
    Update.InlineQueryUpdate &
    Update.MessageUpdate &
    Update.PreCheckoutQueryUpdate &
    Update.PollAnswerUpdate &
    Update.PollUpdate &
    Update.ShippingQueryUpdate;
}
