class CreateSprints < ActiveRecord::Migration[6.0]
  def change
    create_table :sprints do |t|
      t.string :name
      t.string :description
      t.date :start_date
      t.date :end_date
      t.bigint :project_id
      t.timestamps
    end
  end
end
