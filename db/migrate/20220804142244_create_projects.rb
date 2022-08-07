class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.string :description
      t.bigint :owner_id
      t.timestamps
    end
  end
end
