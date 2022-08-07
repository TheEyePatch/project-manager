class CreateParticipations < ActiveRecord::Migration[6.0]
  def change
    create_table :participations do |t|
      t.bigint :user_id
      t.bigint :project_id
      t.timestamps
    end
  end
end
