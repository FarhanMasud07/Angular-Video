export const Entities = {
  Events: 'events',
  Users: 'users',
};

export const Fields = {
  EventsField: ['title', 'price', 'description', 'creator{_id,email password roles}'],
  UsersField: ['email', 'roles', 'createdEvents{title,description,price,date}'],
}
