class ChangeBusiness < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :address, :string, null: false
  end
end
