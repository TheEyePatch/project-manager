class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications do |t|
      t.references :notifiable, polymorphic: true, null: false
      t.references :recipient, null: false
      t.boolean :viewed, null: false, default: false

      t.json :message
      t.text :path
      t.timestamps
    end
  end
end
