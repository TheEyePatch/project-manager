class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.json :description
      t.integer :position
      t.bigint :board_id
      t.bigint :project_id, null: false
      t.bigint :user_id
      t.bigint :sprint_id
      t.timestamps
    end
  end
end
