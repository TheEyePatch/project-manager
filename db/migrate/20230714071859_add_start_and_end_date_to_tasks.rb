class AddStartAndEndDateToTasks < ActiveRecord::Migration[6.0]
  def up
    add_column :tasks, :start_date, :datetime
    add_column :tasks, :end_date, :datetime
    remove_column :tasks, :action

    add_index :tasks, :end_date
  end

  def down
    remove_index :tasks, :end_date
    remove_column :tasks, :start_date
    remove_column :tasks, :end_date
  end
end
