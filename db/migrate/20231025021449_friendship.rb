class Friendship < ActiveRecord::Migration[7.0]
  def change
    create_table :friendships do |t|
      t.integer :follower_id, null: false
      t.integer :followee_id, null: false
      t.timestamps
    end

    add_index :friendships, :follower_id
    add_index :friendships, :followee_id
    add_index :friendships, [:follower_id, :followee_id], unique: true
  end
end
