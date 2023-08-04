class AddAmenty < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :health_score, :boolean
    add_column :businesses, :delivery, :boolean
    add_column :businesses, :take_out, :boolean
    add_column :businesses, :wifi, :boolean
    add_column :businesses, :reservation, :boolean
  end
end
