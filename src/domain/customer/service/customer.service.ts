import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import Customer from "../entity/customer";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import CustomerFactory from "../factory/customer.factory";
import Address from "../value-object/address";

export default class CustomerService {
  constructor(private readonly eventDispatcher: EventDispatcherInterface) {}
  public createCustomer() {
    const customer = CustomerFactory.create("John Doe");
    const event = new CustomerCreatedEvent();
    this.eventDispatcher.notify(event);
    return customer;
  }

  public changeAddress(customer: Customer, address: Address) {
    customer.changeAddress(address);
    const event = new CustomerAddressChangedEvent({
      id: customer.id,
      nome: customer.name,
      endereco: address.toString(),
    });
    this.eventDispatcher.notify(event);
  }
}
