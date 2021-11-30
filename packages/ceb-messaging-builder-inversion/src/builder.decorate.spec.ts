import { assert } from "chai"
import { ElementBuilder } from "@tmorin/ceb-elements-core"
import { Event, Gateway, GatewaySymbol } from "@tmorin/ceb-messaging-core"
import { Container, ContainerBuilder, OnlyConfigureModule } from "@tmorin/ceb-inversion-core"
import { GatewayInversionBuilder } from "./builder"
import { GatewayInversionBuilderModule } from "./module"
import { SimpleGateway } from "@tmorin/ceb-messaging-simple"
import { SinonSpy, spy } from "sinon"

describe("ceb-messaging-builder-inversion/builder/decorate", function () {
  let sandbox: HTMLDivElement
  const tagName = "messaging-gateway-inversion-builder-decorate"
  let container: Container
  let gateway: SimpleGateway
  let testElement: TestElement
  let spiedSubscribe: SinonSpy

  @ElementBuilder.get(TestElement).name(tagName).decorate()
  class TestElement extends HTMLElement {
    @GatewayInversionBuilder.get().decorate()
    gateway?: Gateway

    @GatewayInversionBuilder.get().subscribe().decorate()
    onEventA(event: Event<string>) {}

    @GatewayInversionBuilder.get().subscribe().type("EventA").decorate()
    onEventABis(event: Event<string>) {}
  }

  before(async function () {
    gateway = SimpleGateway.create()
    spiedSubscribe = spy(gateway.events, "subscribe")
    container = await ContainerBuilder.get()
      .module(
        OnlyConfigureModule.create(async function () {
          this.registry.registerValue(GatewaySymbol, gateway)
        })
      )
      .module(new GatewayInversionBuilderModule())
      .build()
      .initialize()
    sandbox = document.body.appendChild(document.createElement("div"))
    testElement = sandbox.appendChild(document.createElement(tagName) as TestElement)
  })

  after(async function () {
    spiedSubscribe.restore()
    await container.dispose()
  })

  it("should resolve container with default settings", function () {
    assert.property(testElement, "gateway")
    assert.equal<any>(testElement.gateway, gateway)
  })

  it("should subscribe", function () {
    assert.equal(spiedSubscribe.callCount, 2)
    assert.equal(spiedSubscribe.getCall(0).args[0], "EventA")
    assert.equal(spiedSubscribe.getCall(1).args[0], "EventA")
  })
})
