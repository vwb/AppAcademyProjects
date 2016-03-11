class RenamePublicColumnOnGoals < ActiveRecord::Migration
  def change
    remove_column :goals, :public
    add_column :goals, :visibility_status, :string, default: "PUBLIC"
  end
end
