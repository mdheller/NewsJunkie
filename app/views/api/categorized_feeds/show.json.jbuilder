json.feed do
  json.name @categorized_feed.feed.name
  json.id @categorized_feed.feed.id
end

json.newCategoryId @categorized_feed.category_id
json.oldCategoryId @old_category_id
