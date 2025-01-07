local r = {
  'nvim-tree/nvim-tree.lua',
  version = '*',
  lazy = false,
  dependencies = {
    'nvim-tree/nvim-web-devicons',
  },
  config = function()
    require('nvim-tree').setup {}
    vim.keymap.set({ 'n', 'v' }, '<leader>e', ':NvimTreeToggle<CR>', { silent = true, noremap = true })
  end,
}

return {}
