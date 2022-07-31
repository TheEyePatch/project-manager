class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title, presence: true
      t.text :description
      t.bigint :category_id
      t.timestamps
    end
  end
end
