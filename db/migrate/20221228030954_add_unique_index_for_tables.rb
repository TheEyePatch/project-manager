class AddUniqueIndexForTables < ActiveRecord::Migration[6.0]
  def up
    add_index(:projects, %i[name owner_id], unique: true) unless index_exists?(:projects, %i[name owner_id], name: 'index_projects_on_name_and_owner_id')
    add_index(:boards, %i[title project_id], unique: true) unless index_exists?(:boards, %i[title project_id], name: 'index_boards_on_title_and_project_id')
    add_index(:tasks, %i[board_id position], unique: true) unless index_exists?(:tasks, %i[board_id positon], name: 'index_tasks_on_board_id_and_position')
  end

  def down
    remove_index(:projects, %i[name owner_id]) if index_exists?(:projects, %i[name owner_id], name: 'index_projects_on_name_and_owner_id')
    remove_index(:boards, %i[title project_id]) if index_exists?(:boards, %i[title project_id], name: 'index_boards_on_title_and_project_id')
    remove_index(:tasks, %i[board_id position]) if index_exists?(:tasks, %i[board_id positon], name: 'index_tasks_on_board_id_and_position')
  end
end
