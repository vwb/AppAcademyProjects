class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.integer :user_id, null: false, index: true
      t.text :content, null: false
      t.boolean :public, default: true, null: false
      t.boolean :completion_status, default: false, null: false
      
      t.timestamps null: false
    end
  end
end
