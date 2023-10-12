class AddReactionCounts < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :helpful_count, :integer
    add_column :reviews, :thanks_count, :integer
    add_column :reviews, :love_this_count, :integer
    add_column :reviews, :oh_no_count, :integer
  end
end
