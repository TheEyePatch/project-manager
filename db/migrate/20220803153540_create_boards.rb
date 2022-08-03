class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.string :title, presence: true
      t.string :description
      t.bigint :project_id, presence: true
      t.timestamps
    end
  end
end
