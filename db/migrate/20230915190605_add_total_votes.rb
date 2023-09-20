class AddTotalVotes < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :total_reviews, :integer
  end
end
