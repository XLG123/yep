class AddHours < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :mon, :string, null: false
    add_column :businesses, :tue, :string, null: false
    add_column :businesses, :wed, :string, null: false
    add_column :businesses, :thu, :string, null: false
    add_column :businesses, :fri, :string, null: false
    add_column :businesses, :sat, :string, null: false
    add_column :businesses, :sun, :string, null: false
  end
end
