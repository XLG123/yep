class AddClaim < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :claimed, :boolean, null: false
  end
end
