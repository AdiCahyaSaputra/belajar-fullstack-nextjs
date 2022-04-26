/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posts', function(table) {
    table.increments(); // primary key : id
    table.string('title');
    table.text('content');
    table.timestamps(true, true); // supaya kolom nya jadi timestamps bukan now()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
