return {
  'sho-87/kanagawa-paper.nvim',
  lazy = false,
  priority = 1000,
  opts = {},
  config = function()
    local kanagawa = require 'kanagawa-paper'
    kanagawa.setup {
      undercurl = true,
      transparent = true,
    }
  end,
}
