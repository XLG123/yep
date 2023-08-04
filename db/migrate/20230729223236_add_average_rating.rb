class AddAverageRating < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :average_rating, :float, null: false
  end
end
