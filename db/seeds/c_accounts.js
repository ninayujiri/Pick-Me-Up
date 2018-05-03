exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('accounts')
      .insert([
        {name: 'Eat My Sushi', address: '12 cheese street', phone_number: '111 111 11 11', email: 'eatmysushi@email.com', isRestaurant: true},
        {name: 'Elrich Bachman', address:'134 Newall road', phone_number:'222 222 22 22', email: 'elrichbachman@email.com', isRestaurant: false},
        {name: 'Richard Hendrix', address:'134 Newall road, room 1', phone_number:'333 333 33 33', email: 'richardhendrix@email.com', isRestaurant: false},
        {name: 'Danesh Gilfoil', address:'134 Newall road, room 2', phone_number:'444 444 44 44', email: 'daneshgilfoil@email.com', isRestaurant: false},
    ])
  ])
};


