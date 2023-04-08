class CreateParticipations < ActiveRecord::Migration[6.0]
  def change
    create_table :participations do |t|
      t.bigint :user_id, index: true
      t.bigint :project_id, index: true
      t.timestamps
    end
  end
end
