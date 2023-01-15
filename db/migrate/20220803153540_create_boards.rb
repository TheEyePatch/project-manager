class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.string :title, null: false
      t.string :description
      t.bigint :project_id, null: false
      t.integer :position, null: false
      t.integer :tasks_count
      t.timestamps
    end
  end
end
