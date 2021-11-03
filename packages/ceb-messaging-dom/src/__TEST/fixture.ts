import {DomCommand, DomEvent, DomMessage, DomQuery, DomResult} from "../message";
import {MessageAction} from "@tmorin/ceb-messaging-core";
import {MessageCommandHandler, MessageEventListener, MessageQueryHandler} from "@tmorin/ceb-messaging-core/src";

export class EventB extends DomEvent<string> {
    static CUSTOM_TYPE = DomMessage.toName(EventB.name)

    constructor(body: string) {
        super(EventB.CUSTOM_TYPE, body);
    }
}

export class CommandA extends DomCommand<string> {
    constructor(body: string) {
        super(DomMessage.toName(CommandA.name), body);
    }
}

export class QueryA extends DomQuery<string> {
    constructor(body: string) {
        super(DomMessage.toName(QueryA.name), body);
    }
}

export class ResultA extends DomResult<string> {
    constructor(action: MessageAction, body: string) {
        super(DomMessage.toName(ResultA.name), action, body);
    }
}

export class ResultB extends DomResult<string> {
    constructor(action: MessageAction, body: string) {
        super(DomMessage.toName(ResultB.name), action, body);
    }
}

export class EventA extends DomEvent<string> {
    constructor(body: string) {
        super(DomMessage.toName(EventA.name), body);
    }
}

export class SimpleCommandA extends DomCommand<string> {
    constructor(
        body: string
    ) {
        super(DomMessage.toName(SimpleCommandA.name), body)
    }
}

export class SimpleCommandB extends DomCommand<string> {
    constructor(
        body: string
    ) {
        super(DomMessage.toName(SimpleCommandB.name), body)
    }
}

export class SimpleQueryA extends DomQuery<string> {
    constructor(
        body: string
    ) {
        super(DomMessage.toName(SimpleQueryA.name), body)
    }
}

export class SimpleResultA extends DomResult<string> {
    constructor(
        body: string,
        action: MessageAction
    ) {
        super(DomMessage.toName(SimpleResultA.name), action, body)
    }
}

export class SimpleEventA extends DomEvent<string> {
    constructor(
        body: string
    ) {
        super(DomMessage.toName(SimpleEventA.name), body)
    }
}

export class SimpleCommandAHandler implements MessageCommandHandler<SimpleCommandA, SimpleResultA> {
    readonly commandType = SimpleCommandA.name
    readonly ResultType = SimpleResultA

    async handle(command: SimpleCommandA): Promise<SimpleResultA> {
        return new SimpleResultA(command.body, command)
    }
}

export class SimpleCommandBHandler implements MessageCommandHandler<SimpleCommandB, SimpleResultA> {
    readonly commandType = SimpleCommandB.name
    readonly ResultType = SimpleResultA

    async handle(command: SimpleCommandB): Promise<[SimpleResultA, Array<SimpleEventA>]> {
        return [new SimpleResultA(command.body, command), [new SimpleEventA(command.body)]]
    }
}

export class SimpleQueryAHandler implements MessageQueryHandler<SimpleQueryA, SimpleResultA> {
    readonly queryType = SimpleQueryA.name
    readonly ResultType = SimpleResultA

    async handle(query: SimpleQueryA): Promise<SimpleResultA> {
        return new SimpleResultA(query.body, query)
    }
}

export class SimpleEventAListener implements MessageEventListener<SimpleEventA> {
    readonly eventType = SimpleEventA.name

    async on(event: SimpleEventA): Promise<void> {
    }
}
